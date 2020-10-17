export class ReverseGeocoder {
  static async getStateName() {
    const components = await this.getAddressComponents(coordinatesInArray);
    return components.state;
  }

  static async getCityName(coordinatesInArray) {
    const components = await this.getAddressComponents(coordinatesInArray);
    return components.city;
  }

  static async getAddressComponents(coordinatesInArray) {
    const geocode = await this.getGeocode(coordinatesInArray);
    return geocode.components;
  }

  static async getGeocode(coordinatesInArray) {
    const lat = coordinatesInArray[0];
    const lng = coordinatesInArray[1];
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=8d15683533104265a19320bd4d49c2c5`
    );
    const responseInJson = await response.json();
    const firstResult = responseInJson.results[0];
    return firstResult;
  }
}
