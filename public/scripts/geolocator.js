export class Geolocator {
  static async getCoordinatesInArrayOrDefault(defaultCoordinatesArray) {
    if (!this.browserHasGeolocation()) {
      return defaultCoordinatesArray;
    }
    const geolocation = await this.getGeolocationOrDefault(undefined);
    return geolocation
      ? [geolocation.coords.latitude, geolocation.coords.longitude]
      : defaultCoordinatesArray;
  }

  static getGeolocationOrDefault(defaultValue) {
    return new Promise((resolve, _reject) => {
      window.navigator.geolocation.getCurrentPosition(
        (location) => {
          resolve(location);
        },
        () => {
          resolve(defaultValue);
        }
      );
    });
  }

  static browserHasGeolocation() {
    return window.navigator.geolocation != undefined;
  }
}
