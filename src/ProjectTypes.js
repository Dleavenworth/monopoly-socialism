export default class ProjectTypes {
	static CommonComfortsHotel = new ProjectTypes("CommonComfortsHotel");
	static ShareNCareHousingEstate = new ProjectTypes("ShareNCareHousingEstate");
	static OpenMindsLibrary = new ProjectTypes("OpenMindsLibrary");
	static OurTownTheatre = new ProjectTypes("OurTownTheatre");
	static EveryVoteTownHall = new ProjectTypes("EveryVoteTownHall");
	static PotluckCommunityCenter = new ProjectTypes("PotluckCommunityCenter");
	static SpeedLilSocialistPostOffice = new ProjectTypes(
		"SpeedLilSocialistPostOffice"
	);
	static FreeNFreshCommunityPark = new ProjectTypes("FreeNFreshCommunityPark");
	static HealthcareForAllHospital = new ProjectTypes(
		"HealthcareForAllHospital"
	);
	static WereAllWinnersSchool = new ProjectTypes("WereAllWinnersSchool");
	static MuseumOfCoCreation = new ProjectTypes("MuseumOfCoCreation");
	static AllPlayRecreationCenter = new ProjectTypes("AllPlayRecreationCenter");
	static WeLoveQuinoaFoodCoOp = new ProjectTypes("WeLoveQuinoaFoodCoOp");
	static NoTipVeganRestaurant = new ProjectTypes("NoTipVeganRestaurant");
	static DairyFreeCoffeeShop = new ProjectTypes("DairyFreeCoffeeShop");
	static TogetherWeRiseBakery = new ProjectTypes("TogetherWeRiseBakery");

	constructor(projectName) {
		this.projectName = projectName;
		ProjectTypes.propList = ProjectTypes.propList || [];
		ProjectTypes.propList.push(this);
	}

	static getPropList() {
		return ProjectTypes.propList;
	}
}
