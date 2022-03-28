export default class ChanceTypes{
    static c1 = new ChanceTypes(
        "Free eyeglasses for everyone! That'll make your 20/20 vision even better, right?", 
        "PAY", -10,
        "Immediately");
    static c2 = new ChanceTypes(
        "Tax time! Socialism doesn't come cheap.",
        "PAY", -100,
        "Immediately"
    );
    static c3 = new ChanceTypes(
        "Minimum wage increase! Sucks to be a small business owner.",
        "PAY", -100,
        "Immediately"
    );
    static c4 = new ChanceTypes(
        "Time to plant some tress downtown. Hope you have a green thumb!",
        "PAY", -50,
        "Immediately"
    );
    static c5 = new ChanceTypes(
        "Social Security benefits have iincreased. That's great n ews ... for OLD PEOPLE",
        "PAY", -100,
        "Immediately"
    );
    static c6 = new ChanceTypes(
        "The school needs new computers. Don't have kids? Tough luck",
        "PAY", -20,
        "Immediately"
    );
    static c7 = new ChanceTypes(
        "We voted. It's time for a shake-up.",
        "SWAP", 0,
        "Hold"
    )
    static c8 = new ChanceTypes(
        "Your l ittle offshore account has been uncovered. Guess what we do to greedy capitalists?",
        "JAIL", 0,
        "Immediately"
    );
    static c9 = new ChanceTypes(
        "Brrr. It's as cold as Vermont around here. Good thing our community pays for heating.",
        "PAY", -50,
        "Immediately"
    );
    static c10 = new ChanceTypes(
        "You chip a tooth on some homemade granola, but no dental bill for you! Thanks, socialism!",
        "PAY", -20,
        "Immediately"
    );
    static c11 = new ChanceTypes(
        "Uh-oh potholes on Main Street. Time to call Public Works.",
        "PAY", -50,
        "Immediately"
    );
    static c12 = new ChanceTypes(
        "Your neighbor's son gets into college. Our community covers tuition. Thanks, socialism!",
        "PAY", 20,
        "Immediately"
    );
    static c13 = new ChanceTypes(
        "You catch your neighbor buying supplies from a big box hardware store.",
        "REMOVE", 0,
        "Hold"
    );
    static c14 = new ChanceTypes(
        "Your neightbor tells everyone they got food poiisoning from your vegan meatloaf.",
        "REMOVE", 0,
        "Hold"
    );
    

    constructor(chanceText, chanceAction, chanceTotal, chanceWhen){
        this.chanceText = chanceText;
        this.chanceAction = chanceAction;
        this.chanceTotal = chanceTotal
        this.chanceWhen = chanceWhen;
        ChanceTypes.propList = ChanceTypes.propList || [];
        ChanceTypes.propList.push(this);
    } 

   static getChanceList(){
       return ChanceTypes.propList;
   }
}
