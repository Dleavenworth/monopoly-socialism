export default class PropertyTypes {
    static CommonComfortsHotel = new PropertyTypes("CommonComfortsHotel");
    static ShareNCareHousingEstate = new PropertyTypes(
        "ShareNCareHousingEstate"
    );
    static OpenMindsLibrary = new PropertyTypes("OpenMindsLibrary");
    static OurTownTheatre = new PropertyTypes("OurTownTheatre");
    static EveryVoteTownHall = new PropertyTypes("EveryVoteTownHall");
    static PotluckCommunityCenter = new PropertyTypes("PotluckCommunityCenter");
    static SpeedLilSocialistPostOffice = new PropertyTypes(
        "SpeedLilSocialistPostOffice"
    );
    static FreeNFreshCommunityPark = new PropertyTypes(
        "FreeNFreshCommunityPark"
    );
    static HealthcareForAllHospital = new PropertyTypes(
        "HealthcareForAllHospital"
    );
    static WereAllWinnersSchool = new PropertyTypes("WereAllWinnersSchool");
    static MuseumOfCoCreation = new PropertyTypes("MuseumOfCoCreation");
    static AllPlayRecreationCenter = new PropertyTypes(
        "AllPlayRecreationCenter"
    );
    static WeLoveQuinoaFoodCoOp = new PropertyTypes("WeLoveQuinoaFoodCoOp");
    static NoTipVeganRestaurant = new PropertyTypes("NoTipVeganRestaurant");
    static DairyFreeCoffeeShop = new PropertyTypes("DairyFreeCoffeeShop");
    static TogetherWeRiseBakery = new PropertyTypes("TogetherWeRiseBakery");

    constructor(propertyName) {
        this.propertyName = propertyName;
        PropertyTypes.propList = PropertyTypes.propList || [];
        PropertyTypes.propList.push(this);
    }

    static getPropList() {
        return PropertyTypes.propList;
    }
}
