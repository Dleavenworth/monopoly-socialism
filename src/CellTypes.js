export default class CellTypes {
	static Cell = new CellTypes("Cell");
	static Jail = new CellTypes("Jail");
	static GoToJail = new CellTypes("GoToJail");
	static Go = new CellTypes("Go");
	static Start = new CellTypes("Start");
	static Property = new CellTypes("Property");
	static Chance = new CellTypes("Chance");
	static Shuttle = new CellTypes("Shuttle");
	static Parking = new CellTypes("Parking");
	static Chest = new CellTypes("CommunintyChest");
	static statis = new CellTypes("Player status");

	constructor(type) {
		this.type = type;
		CellTypes.propList = CellTypes.propList || [];
		CellTypes.propList.push(this);
	}

	static getPropList() {
		return CellTypes.propList;
	}
}
