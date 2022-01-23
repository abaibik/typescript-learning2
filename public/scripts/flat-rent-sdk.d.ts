export function cloneDate(date: Date): Date;
export function addDays(date: Date, days: number): Date;
export const backendPort: 3040;
export const localStorageKey: "flat-rent-db";
export interface BaseFlat {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: Date[];
}

export interface DatabaseEl extends BaseFlat {
  price: number;
}

export type Database = DatabaseEl[];

export interface FoundFlat extends BaseFlat {
  totalPrice: number;
}
export class FlatRentSdk {
  database: Database;
  /**
   * Get flat by ID.
   *
   * @param {string} id Flat ID.
   * @returns {Promise<Object|null>} Flat.
   */
  get(id: string): Promise<DatabaseEl | null>;
  /**
   * Search for flats.
   *
   * @param {Object} parameters Search parameters
   * @param {string}parameters.city City name
   * @param {Date} parameters.checkInDate Check-in date
   * @param {Date} parameters.checkOutDate Check-out date
   * @param {number} [parameters.priceLimit] Max price for a night
   * @returns {Object[]} List of suitable flats.
   */
  search(parameters: {
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    priceLimit?: number;
  }): FoundFlat[];
  /**
   * Book flat.
   *
   * @param {number} flatId
   * @param {Date} checkInDate
   * @param {Date} checkOutDate
   * @returns {number}
   */
  book(flatId: string, checkInDate: Date, checkOutDate: Date): number;
  _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void;
  _resetTime(date: Date): void;
  _calculateDifferenceInDays(startDate: Date, endDate: Date): number;
  _generateDateRange(from: Date, to: Date): Date[];
  _generateTransactionId: () => number;
  _areAllDatesAvailable(flat: DatabaseEl, dateRange: Date[]): boolean;
  _formatFlatObject(flat: DatabaseEl): DatabaseEl;
  _formatFlatObject(flat: DatabaseEl, nightNumber: number): FoundFlat;
  _readDatabase(): Database;
  _writeDatabase(database: Database): void;
  _syncDatabase(database: Database): void;
}
