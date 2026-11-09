/**
 * ===================================================================
 * 🍞 泡沫默汐的麵包店 - 委託品項資料庫與開放狀態開關
 * Paomo Bakery - Commission Products & Open/Closed Status Config
 * ===================================================================
 * 
 * 【如何控制個別品項的開放狀態？】
 * 每個委託品項皆包含 `isOpen` 屬性：
 * - isOpen: true  => 開放接單（正常顯示於菜單與作品展示分類）
 * - isOpen: false => 暫停接單（自動隱藏訂購卡片與作品展示分類，不顯示給訪客）
 * 
 * 💡 只要在此檔案修改 `isOpen: false` 或 `isOpen: true`，
 *    index.html（訂購頁面）與 gallery.html（作品展示頁面）會自動同步生效！
 *    資料物件與相關價格計算保留在程式碼中，不會造成資料遺失或系統報錯。
 */

const commissionProducts = {
    pretzel: {
        id: 'pretzel',
        name: '蝴蝶餅 (抽象頭像)',
        title: '蝴蝶餅 &nbsp;(抽象頭像)',
        category: '蝴蝶餅',
        icon: '🥨',
        desc: '抽象的小插畫，總之就是很抽象!適合當小頭像。',
        descShort: '抽象的小插畫，總之就是很抽象!適合當小頭像。',
        priceDisplay: 'NT$ 80 / 人',
        basePrice: 80,
        isOpen: true // 開放狀態開關 (true: 開放中 / false: 暫停接單)
    },
    baguette: {
        id: 'baguette',
        name: '法國麵包 (短腿Q版)',
        title: '法國麵包 &nbsp;(短腿Q版)',
        category: '法國麵包',
        icon: '🥖',
        desc: '短腿Q版小人，外酥內軟，給你最可愛的呈現。',
        descShort: '短腿Q版小人，外酥內軟，給你最可愛的呈現。',
        priceDisplay: 'NT$ 300 / 人',
        basePrice: 300,
        isOpen: true // 開放狀態開關
    },
    pancake: {
        id: 'pancake',
        name: '鬆餅 (長腿Q版)',
        title: '鬆餅 &nbsp;(長腿Q版)',
        category: '鬆餅',
        icon: '🥞',
        desc: '長腿Q版小人，適合互動感滿滿滿滿的互動搭配。',
        descShort: '長腿Q版小人，適合互動感滿滿滿滿的互動搭配。',
        priceDisplay: 'NT$ 400 起',
        basePrice: 400,
        isOpen: true // 開放狀態開關
    },
    basket: {
        id: 'basket',
        name: '麵包籃 (Q版插畫)',
        title: '麵包籃 &nbsp;(Q版插畫)',
        category: '麵包籃',
        icon: '🧺',
        desc: '多人互動或是Q版場景插圖，綜合麵包籃，滿足你所有的想像！',
        descShort: '多人互動或是Q版場景插圖，綜合麵包籃，滿足你所有的想像！',
        priceDisplay: 'NT$ 500 起',
        basePrice: 500,
        isOpen: true // 開放狀態開關
    },
    toast: {
        id: 'toast',
        name: '吐司 (正比頭像)',
        title: '吐司 &nbsp;(正比頭像)',
        category: '精緻頭像',
        icon: '🍞',
        desc: '正比例精緻頭像，為您展現角色的獨特風格與魅力。',
        descShort: '正比例精緻頭像，為您展現角色的獨特風格與魅力。',
        priceDisplay: 'NT$ 800 起',
        basePrice: 800,
        isOpen: true // 開放狀態開關
    },
    donut: {
        id: 'donut',
        name: '甜甜圈 (胸像橫插)',
        title: '甜甜圈 &nbsp;(胸像橫插)',
        category: '胸像橫插',
        icon: '🍩',
        desc: '氛圍胸像橫插，加上些許氛圍背景，讓人忍不住想咬一口。',
        descShort: '氛圍胸像橫插，加上些許氛圍背景，讓人忍不住想咬一口。',
        priceDisplay: 'NT$ 1000 起',
        basePrice: 1000,
        isOpen: true // 開放狀態開關
    },
    cake: {
        id: 'cake',
        name: '蛋糕 (氛圍插畫)',
        title: '蛋糕 &nbsp;(氛圍插畫)',
        category: '場景插畫',
        icon: '🍰',
        desc: '極具氛圍感的大插畫，提供最豪華精緻的下午茶視覺饗宴。',
        descShort: '極具氛圍感的大插畫，提供最豪華精緻的下午茶視覺饗宴。',
        priceDisplay: 'NT$ 1200 起',
        basePrice: 1200,
        isOpen: true // 開放狀態開關
    },
    gummy: {
        id: 'gummy',
        name: '軟糖 (Q版桌寵小人)',
        title: '軟糖 &nbsp;(Q版桌寵小人)',
        category: '軟糖小人',
        icon: '🍬',
        desc: '可以放在桌面上搖頭晃腦陪伴你的可愛軟糖小生物。',
        descShort: '可以放在桌面上搖頭晃腦陪伴你的可愛軟糖小生物。',
        priceDisplay: 'NT$ 500 起',
        basePrice: 500,
        isOpen: true // 開放狀態開關
    },
    surprise: {
        id: 'surprise',
        name: '🍞 驚喜麵包 (Color Sketch Surprise)',
        title: '驚喜麵包 &nbsp;(草插驚喜包)',
        category: '驚喜麵包',
        icon: '🍞',
        desc: '色彩速寫驚喜包！單價 NT$500／角色，兩位 NT$1,000，三位 NT$1,500。構圖隨機（大頭/半身/全身），色彩氛圍由繪師自由發揮。無草稿確認流程，每筆固定收取 NT$200 訂金（中途取消不退）。',
        descShort: '構圖隨機（大頭/半身/全身），無草稿確認流程，可許願!',
        priceDisplay: 'NT$ 500 / 角色',
        tag: '固定收取 NT$ 200 訂金（取消不退）',
        basePrice: 500,
        isOpen: true // 開放狀態開關
    }
};

// 作品展示分類名稱與品項 key 對照表
const categoryToProduct = {
    '蝴蝶餅': 'pretzel',
    '法國麵包': 'baguette',
    '鬆餅': 'pancake',
    '麵包籃': 'basket',
    '精緻頭像': 'toast',
    '正比頭像': 'toast',
    '胸像橫插': 'donut',
    '場景插畫': 'cake',
    '軟糖小人': 'gummy',
    '驚喜麵包': 'surprise'
};

// 狀態檢查工具函式
function isProductOpen(productKey) {
    const list = (typeof commissionProducts !== 'undefined') ? commissionProducts : (typeof products !== 'undefined' ? products : null);
    if (!list || !list[productKey]) return false;
    return list[productKey].isOpen !== false;
}

function isCategoryOpen(categoryName) {
    const mapping = (typeof categoryToProduct !== 'undefined') ? categoryToProduct : null;
    const prodKey = mapping ? mapping[categoryName] : null;
    if (!prodKey) return true; // 若該分類未在品項對照表中，預設開放
    return isProductOpen(prodKey);
}

// 掛載至全域物件 (window)，支援舊版 products 變數相容
if (typeof window !== 'undefined') {
    window.commissionProducts = commissionProducts;
    window.products = commissionProducts;
    window.categoryToProduct = categoryToProduct;
    window.isProductOpen = isProductOpen;
    window.isCategoryOpen = isCategoryOpen;
}

// 支援 Node.js 環境匯出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        commissionProducts,
        products: commissionProducts,
        categoryToProduct,
        isProductOpen,
        isCategoryOpen
    };
}
