import type { GoldRecord } from '../types/gold';

const STORAGE_KEY = 'gold_cost_calculator_records_v1';
const MAX_RECORDS = 10;

export function getGoldRecords(): GoldRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECORDS) : [];
  } catch {
    return [];
  }
}

export function saveGoldRecord(record: GoldRecord): GoldRecord[] {
  const records = getGoldRecords();
  const nextRecords = [record, ...records.filter((item) => item.id !== record.id)].slice(0, MAX_RECORDS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecords));
  return nextRecords;
}
