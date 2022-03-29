export const normalizeCurrenciesList = (from) => {
    let arr = Object.entries(from.Valute).sort()
    return  arr.map((item)=>({
        code:item[0],
        id:item[1].ID,
        name:item[1].Name,
        value:item[1].Value,
        nominal:item[1].Nominal,
        previous:item[1].Previous,
        difference:
            ((item[1].Value-item[1].Previous)/item[1].Previous*100).toFixed(4)
    }))
};