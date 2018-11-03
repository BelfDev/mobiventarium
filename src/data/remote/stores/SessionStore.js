import { observable, action } from "mobx";
import BaseStore from "./BaseStore";
import AuthenticationApiService from "../services/InventoryApiService";

export default class SessionStore extends BaseStore {

  @observable
  user = {};

  @action
  updateSessionUser(user) {
      this.user = user
  }

//   @action
//   async getItems() {
//     try {
//       this.isRefresing = true;
//       const items = await InventoryApiService.getItems();
//       this.itemList = items;
//     } catch (error) {
//       console.log(
//         `>>> getItems error - ${JSON.stringify(error.message, null, 2)}`
//       );
//     } finally {
//       this.isRefresing = false;
//     }
//   }

//   @action
//   async subscribeToInventory() {
//     try {
//       this.isRefresing = true;
//       return await InventoryApiService.subscribeToInventory(this.onItemChange);
//     } catch (error) {
//       console.log(
//         `>>> subscribeToInventory error - ${JSON.stringify(
//           error.message,
//           null,
//           2
//         )}`
//       );
//     } finally {
//       this.isRefresing = false;
//     }
//   }

//   onItemChange = snapshot => {
//     this.itemList = snapshot.docs.map(doc => ({
//       id: doc.id,
//       data: doc.data()
//     }));
//   };
}
