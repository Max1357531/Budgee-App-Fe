const charCode = 'a'.charCodeAt(0);

var identName = function (a) {
    var b = [a], sp, out, i, div;

    sp = 0;
    while (sp < b.length) {
        if (b[sp] > 25) {
            div = Math.floor(b[sp] / 26);
            b[sp + 1] = div - 1;
            b[sp] %= 26;
        }
        sp += 1;
    }

    out = "";
    for (i = 0; i < b.length; i += 1) {
        out = String.fromCharCode(charCode + b[i]) + out;
    }

    return out;
}

export function generateCurrentBudget() {
    return Promise.resolve({
        budget_id: 1,
        budget: 1000 + Math.round(Math.random() * 100),
        interval: {
            start_date: new Date(Date.now() - 1.21 * 10 ** 9),
            end_date: new Date(Date.now() + 1.21 * 10 ** 9)
        }
    })
}

export function generateCategoryData(no_categories) {
    const categoryData = []
    for (let i = 0; i < no_categories; i++) {
        categoryData.push({
            category_id: i,
            name: identName(i),
            colour_id: Math.round(Math.random() * 1000),
            description: identName(i * 1000)
        })
    }
    return Promise.resolve(categoryData)
}


export function generateExpenseData(categoryData, no_expenses) {
    const expenseData = []
    const cat_ids = categoryData.map((cat) => cat.category_id)


    for (let i = 0; i < no_expenses; i++) {
        expenseData.push({
            expense_id: i,
            budget_id: 1,
            category_id: cat_ids[Math.floor(Math.random() * cat_ids.length)],
            amount: Math.round((Math.random() * 10000)) / 100,
            description: identName(i * 10001),
            date: new Date(new Date() - Math.random() * 100000000000)
        })
    }
    return Promise.resolve(expenseData)
}


export function generateColorData(no_colors) {
    const colorData = []

    for (let i = 0; i < no_colors; i++) {
        colorData.push({
            id: i,
            hex_code: '#' + '0'.repeat(6 - (Math.floor(i / no_colors * 16 ** 6).toString(16)).length) + (Math.floor(i / no_colors * 16 ** 6).toString(16)),
            name: identName(i * 10001),
        })
    }
    return Promise.resolve(colorData)
}

// console.log(generateColorData(25))
