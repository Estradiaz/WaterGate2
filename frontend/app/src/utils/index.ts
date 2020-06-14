export function replaceOrAdd<T extends {_id: string}>(list: T[], item: T){

    let index = list.findIndex(ds => ds._id == item._id)
    if(index >= 0){
        list.splice(index, 1, item)
    } else {
        list.push(item)
    }
    return list
}

export function capitalizeFirst(input: string): string {

    return input[0].toUpperCase() + input.slice(1);
}
