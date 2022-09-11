class AssetLocation {
  constructor(location) {
    this.assetSequential = location.assetSequential?? 0
    this.inputText = location.inputText?.trim()
    this.outFormattedAddress = location.outFormattedAddress?.trim()
    this.outName = location.outName?.trim()
    this.outPlaceId = location.outPlaceId?.trim()
    this.outLatitude = location.outLatitude?.trim()
    this.outLongitude = location.outLongitude?.trim()
  }
}

module.exports = AssetLocation