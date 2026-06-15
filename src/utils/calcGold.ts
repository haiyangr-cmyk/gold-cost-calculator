import type {
  CostResult,
  GoldFormValues,
  NumericGoldInput,
  ProfitResult,
  ValidationErrors
} from '../types/gold';

const MONEY_DECIMALS = 2;
const RATE_DECIMALS = 4;

/** 保留指定小数，避免界面出现浮点误差。 */
export function roundTo(value: number, decimals = MONEY_DECIMALS): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * 将输入框文本规范为非负小数。
 * 说明：这里仅做字符层清洗，不做业务校验；空值仍然保留给 validateForm 提示。
 */
export function normalizeDecimalInput(value: string): string {
  const normalized = value.replace(',', '.').replace(/[^0-9.]/g, '');
  const parts = normalized.split('.');

  if (parts.length <= 1) {
    return parts[0];
  }

  return `${parts[0]}.${parts.slice(1).join('')}`;
}

export function toNumber(value: string): number | null {
  if (value.trim() === '') {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

/**
 * 统一校验全部输入字段：
 * - 禁止空值
 * - 禁止负数
 * - 禁止非数字
 * - 克重必须大于 0，避免综合单克成本除以 0
 */
export function validateForm(values: GoldFormValues): {
  isCostValid: boolean;
  isProfitValid: boolean;
  errors: ValidationErrors;
  numeric: NumericGoldInput;
} {
  const labels: Record<keyof GoldFormValues, string> = {
    goldPrice: '基础金价',
    weight: '克重',
    craftFee: '手工费',
    premium: '溢价',
    expectedSellPrice: '预期卖出金价'
  };

  const errors: ValidationErrors = {};
  const numeric = {
    goldPrice: toNumber(values.goldPrice),
    weight: toNumber(values.weight),
    craftFee: toNumber(values.craftFee),
    premium: toNumber(values.premium),
    expectedSellPrice: toNumber(values.expectedSellPrice)
  };

  (Object.keys(values) as Array<keyof GoldFormValues>).forEach((key) => {
    if (values[key].trim() === '') {
      errors[key] = `${labels[key]}不能为空`;
      return;
    }

    if (numeric[key] === null) {
      errors[key] = `${labels[key]}只能填写非负数字`;
    }
  });

  if (numeric.weight !== null && numeric.weight <= 0) {
    errors.weight = '克重必须大于 0';
  }

  const safeNumeric: NumericGoldInput = {
    goldPrice: numeric.goldPrice ?? 0,
    weight: numeric.weight ?? 0,
    craftFee: numeric.craftFee ?? 0,
    premium: numeric.premium ?? 0,
    expectedSellPrice: numeric.expectedSellPrice ?? 0
  };

  const isCostValid = !errors.goldPrice && !errors.weight && !errors.craftFee && !errors.premium;
  const isProfitValid = isCostValid && !errors.expectedSellPrice;

  return {
    isCostValid,
    isProfitValid,
    errors,
    numeric: safeNumeric
  };
}

/**
 * 黄金入手成本公式。
 * 当前 MVP 默认：
 * - 手工费 = 手工费单价 × 克重
 * - 溢价 = 溢价单价 × 克重
 * 后续若要适配“一口价手工费”或品牌费率，只需修改此函数。
 */
export function calculateGoldCost(input: Pick<NumericGoldInput, 'goldPrice' | 'weight' | 'craftFee' | 'premium'>): CostResult {
  const rawMaterialCost = input.goldPrice * input.weight;
  const craftCost = input.craftFee * input.weight;
  const premiumCost = input.premium * input.weight;
  const totalCost = rawMaterialCost + craftCost + premiumCost;
  const averageCostPerGram = input.weight > 0 ? totalCost / input.weight : 0;

  return {
    rawMaterialCost: roundTo(rawMaterialCost),
    craftCost: roundTo(craftCost),
    premiumCost: roundTo(premiumCost),
    totalCost: roundTo(totalCost),
    averageCostPerGram: roundTo(averageCostPerGram)
  };
}

/**
 * 简易盈亏公式。
 * - 毛利：预期卖出收入 - 原料金价成本
 * - 净收益：预期卖出收入 - 实际总花费
 */
export function calculateProfit(input: NumericGoldInput, costResult: CostResult): ProfitResult {
  const expectedRevenue = input.expectedSellPrice * input.weight;
  const rawMaterialCost = input.goldPrice * input.weight;
  const grossProfit = expectedRevenue - rawMaterialCost;
  const netProfit = expectedRevenue - costResult.totalCost;
  const netProfitRate = costResult.totalCost > 0 ? netProfit / costResult.totalCost : 0;

  return {
    expectedRevenue: roundTo(expectedRevenue),
    grossProfit: roundTo(grossProfit),
    netProfit: roundTo(netProfit),
    netProfitRate: roundTo(netProfitRate, RATE_DECIMALS)
  };
}

export function formatMoney(value: number): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

export function formatRate(value: number): string {
  return `${roundTo(value * 100, 2).toFixed(2)}%`;
}
