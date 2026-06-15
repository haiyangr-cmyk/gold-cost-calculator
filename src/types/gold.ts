export interface GoldFormValues {
  /** 基础金价，单位：元/克 */
  goldPrice: string;
  /** 黄金克重，单位：克 */
  weight: string;
  /** 手工费，单位：元/克 */
  craftFee: string;
  /** 溢价，单位：元/克 */
  premium: string;
  /** 预期卖出金价，单位：元/克 */
  expectedSellPrice: string;
}

export interface NumericGoldInput {
  goldPrice: number;
  weight: number;
  craftFee: number;
  premium: number;
  expectedSellPrice: number;
}

export interface CostResult {
  rawMaterialCost: number;
  craftCost: number;
  premiumCost: number;
  totalCost: number;
  averageCostPerGram: number;
}

export interface ProfitResult {
  expectedRevenue: number;
  grossProfit: number;
  netProfit: number;
  netProfitRate: number;
}

export interface GoldRecord {
  id: string;
  createdAt: string;
  input: NumericGoldInput;
  costResult: CostResult;
  profitResult: ProfitResult;
}

export type ValidationErrors = Partial<Record<keyof GoldFormValues, string>>;
