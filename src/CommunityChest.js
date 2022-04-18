export default class CommunityChest{
    static Chest = new CommunityChest(1848);

    constructor(chestTotal){
        CommunityChest.chestTotal = chestTotal;
    }
    static getTotal(){
        return CommunityChest.chestTotal;
    }
    setTotal(newTotal){
        CommunityChest.chestTotal = newTotal;
    }
}