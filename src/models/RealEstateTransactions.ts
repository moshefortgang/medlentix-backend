export interface RealEstateTransactions {
  id: number;
	gus: number,
	helka: number,
	tat_helka: number,
	sale_date: Date,
	declared_value_in_shekel: number,
	sale_value_in_shekel: number,
	property_type: string,
	sold_part: number,
	locality: string,
	construction_year: number,
	area: number,
	rooms: number
}
