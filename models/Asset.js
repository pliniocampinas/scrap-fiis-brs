class Asset {
  constructor(scrap) {
    this.title = scrap.title?.trim()
    this.address = scrap.address?.trim()
    this.neighborhood = scrap.neighborhood?.trim()
    this.squareMeters = parseInt(scrap.squareMeters?.replace('m2', '')
      .replace('.', '')
      .split(',')[0]
      .trim()
    ) || 0
    this.fundAcronym = scrap.fundAcronym?.trim()
    this.city = scrap.city?.trim()
    this.state = scrap.state?.trim().toUpperCase()
  }

  validade() {
    if(this.fundAcronym === null || this.fundAcronym === undefined) {
      return {
        isValid: false,
        error: 'FundAcronym cannot be null or undefined'
      }
    }

    if(this.fundAcronym.length == 0) {
      return {
        isValid: false,
        error: 'FundAcronym cannot be empty'
      }
    }

    if(this.fundAcronym.length > 10) {
      return {
        isValid: false,
        error: 'FundAcronym cannot be larger than 10 characters'
      }
    }

    if((this.state?.length || 0) == 0) {
      return {
        isValid: false,
        error: 'State cannot be empty'
      }
    }

    if(this.state.length != 2) {
      return {
        isValid: false,
        error: 'State should have 2 characters'
      }
    }

    return {
      isValid: true,
    }
  }
}

module.exports = Asset