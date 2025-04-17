const charCode = 'a'.charCodeAt(0);

var identName = function (a) {
  var b = [a], sp, out, i, div;

    sp = 0;
    while(sp < b.length) {
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

export function generateCurrentBudget(){
        return Promise.resolve({
            budget_id : 1,
            budget : 5000+Math.round(Math.random()*100),
            interval : {start_date : new Date(new Date()-1.21e+9*2),
            end_date : new Date(new Date()+1.21e+9*2)
        }
    })
}

export function generateCategoryData (no_categories){
    const categoryData = []
    for (let i = 0; i < no_categories; i++){
        categoryData.push( {
            category_id : i, 
            name : identName(i),
            colour_id : Math.round(Math.random()*1000),
            description : identName(i*1000)
           })
    }
    return Promise.resolve(categoryData)
}


export function generateExpenseData(categoryData,no_expenses){
    const expenseData = []
    const cat_ids = categoryData.map((cat)=>cat.category_id)


    for (let i = 0; i < no_expenses; i++){
        expenseData.push({
            expense_id : i,
            budget_id : 1,
            category_id : cat_ids[Math.floor(Math.random() * cat_ids.length)], 
            amount : Math.round((Math.random()*10000))/100,
            description : identName(i*10001),
            date: new Date(new Date() - Math.random()*100000000000)
           })
    }
    return Promise.resolve(expenseData)
}

generateCurrentBudget().then((res)=> console.log(res))