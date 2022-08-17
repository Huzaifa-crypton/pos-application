export default function reducer (state = {} , action){
    switch(action.type){
        case "product_to_be_edited":
            return state = action.payload
        case "reset_product_to_be_updated":
            return state = {}
        default :
        return state
    }
}