export default class CellTypes {
    static Cell = new CellTypes("Cell");
    static Jail = new CellTypes("Jail");
    static GoToJail = new CellTypes("GoToJail");
    static Go = new CellTypes("Go");
    static Start = new CellTypes("Start");
    static Property = new CellTypes("Property");
    static Chance = new CellTypes("Chance");

    constructor(type) {
        this.type = type;
    }
}
