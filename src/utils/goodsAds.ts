export interface GoodsAdItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  href: string;
}

/**
 * 商品分销配置。
 * 后续拿到淘宝联盟、京东联盟、Amazon、品牌合作链接后，只需要替换 href。
 */
export const goodsAds: GoodsAdItem[] = [
  {
    id: 'gold_scale',
    icon: 'g',
    title: '电子克重秤',
    desc: '适合核对金饰克重',
    href: '#'
  },
  {
    id: 'jewelry_box',
    icon: '囍',
    title: '婚嫁首饰收纳盒',
    desc: '适合三金五金收纳',
    href: '#'
  },
  {
    id: 'gold_cleaning',
    icon: '✨',
    title: '黄金清洁护理',
    desc: '擦金布与清洁用品',
    href: '#'
  }
];
