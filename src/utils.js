module.exports = {
    /**
     * @param {a} object containing latitude and longitude
     * @param {b} object containing latitude and longitude
     * @returns distance in meters
     * @example
     * const distance = utils.calculateDistance({ latitude: -6.175392, longitude: 106.827153 }, { latitude: -6.175392, longitude: 106.827153 });
     * console.log(distance); // 0
     * @throws error if parameter a || b is not object  
     * @throws error if parameter a || b is not provided
     * @throws error if parameter a.latitude || a.longitude is not number
     * @throws error if parameter b.latitude || b.longitude is not number
    */
    calculateDistance(a, b) {
        if (!a || !b) throw new Error('Parameter a and b is required');
        if (typeof a !== 'object' || typeof b !== 'object') throw new Error('Parameter a and b must be object');
        if (!a.latitude || !a.longitude || !b.latitude || !b.longitude) throw new Error('Parameter a and b must have latitude and longitude');
        if (typeof a.latitude !== 'number' || typeof a.longitude !== 'number' || typeof b.latitude !== 'number' || typeof b.longitude !== 'number') throw new Error('Parameter a and b must have latitude and longitude as number');

        const RADIUS = 6371;
        const distanceLatitude = (b.latitude - a.latitude) * Math.PI / 180;
        const distanceLongitude = (b.longitude - a.longitude) * Math.PI / 180;
        const A =
            Math.sin(distanceLatitude / 2) * Math.sin(distanceLatitude / 2) +
            Math.cos(a.latitude  * Math.PI / 180 ) * Math.cos((b.latitude) * Math.PI / 180) *
            Math.sin(distanceLongitude / 2) * Math.sin(distanceLongitude / 2);
        const C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
        const distance = RADIUS * C;
        return distance;
    },
}