import Dexie, { Table } from "dexie";
import { Consumption } from "../types/Consumption";
import { Food } from "../types/Food";
import { FoodContainer } from "../types/FoodContainer";
import FoodContainerUtils from '../utils/FoodContainer';
import ConsumptionDatabase from "./ConsumptionDatabase";
class FoodContainerDatabase extends Dexie {
  foodContainers!: Table<FoodContainer>;

  constructor() {
    super("foodContainerDatabase");
    this.version(1).stores({
      foodContainers: "&identifier,&name,content",
    });
  }

  async createFoodContainer(name: string | null, identifier: string) {
    return this.foodContainers.add({
      name: name || `Food Container ${identifier}`,
      identifier,
      content: [],
    });
  }

  getFoodContainerById(identifier: string) {
    return this.foodContainers.get(identifier);
  }

  updateFoodContainerInfo(identifier: string, info: Pick<FoodContainer, "name">) {
    return this.foodContainers.update(identifier, info);
  }

  setFoodContainerContentById(identifier: string, content: Food[]) {
    const contentWithoutDuplicates = FoodContainerUtils.mergeDuplicatedFoodContent(content);
    return this.foodContainers.update(identifier, { content: contentWithoutDuplicates });
  }

  getAll() {
    return this.foodContainers.toArray();
  }

  removeFoodContainer(identifier: string) {
    return this.foodContainers.delete(identifier);
  }

  async consumeFoodContainer(identifier: string, date: number) {
    const foodContainer = await this.getFoodContainerById(identifier);
    if (!foodContainer) {
      throw new Error(`Cannot consume food container that does not exist (id: ${identifier})`);
    }

    const addingConsumptions = foodContainer.content.map<Consumption>(food => ({ ...food, date }));
    await Promise.all([
      ...addingConsumptions.map((consumption) => ConsumptionDatabase.add(consumption)),
      this.setFoodContainerContentById(identifier, []),
    ]);
  }
}

export default new FoodContainerDatabase();
