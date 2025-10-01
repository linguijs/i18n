import { Resource } from "./types";

export default class DataStore {
  /**
   * Constructor.
   */
  constructor(private data: Resource = {}) {
    console.log('data', this.data);
  }
}
