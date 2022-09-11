class AssetLocation {
  constructor(location) {
    this.assetSequential = scrap.assetSequential?.trim()
    this.inputText = scrap.inputText?.trim()
    this.outFormattedAddress = scrap.outFormattedAddress?.trim()
    this.outName = scrap.outName?.trim()
    this.outPlaceId = scrap.outPlaceId?.trim()
    this.outLatitude = scrap.outLatitude?.trim()
    this.outLongitude = scrap.outLongitude?.trim()
  }
}

module.exports = AssetLocation