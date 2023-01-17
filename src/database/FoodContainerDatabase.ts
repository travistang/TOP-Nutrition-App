import Dexie, { Table } from "dexie";
import { Food } from "../types/Food";
import { FoodContainer } from "../types/FoodContainer";

class FoodContainerDatabase extends Dexie {
  foodContainers!: Table<FoodContainer>;

  constructor() {
    super("foodContainerDatabase");
    this.version(1).stores({
      foodContainers: "&identifier,&name,content",
    });
  }

  async createFoodContainer(name: string | null, identifier: string) {
    if (name) {
      return this.foodContainers.add({
        name,
        identifier,
        content: [],
      });
    }

    const numContainers = (await this.getAll()).length;
    const generatedName = `Food Container ${+numContainers + 1}`;
    return this.foodContainers.add({
      name: generatedName,
      identifier, content: []
    });
  }

  getFoodContainerById(identifier: string) {
    return this.foodContainers.get(identifier);
  }

  setFoodContainerContentById(identifier: string, content: Food[]) {
    return this.foodContainers.update(identifier, { content });
  }

  getAll() {
    return this.foodContainers.toArray();
  }

  removeFoodContainer(identifier: string) {
    return this.foodContainers.delete(identifier);
  }
}

export default new FoodContainerDatabase();
