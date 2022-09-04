class Fund {
  constructor(scrap) {
    this.url = scrap?.url?.trim()
    this.acronym = scrap?.acronym?.trim()
    this.longName = scrap?.longName?.trim()
    this.admin = scrap?.admin?.trim()
    this.source = scrap.source
  }

  validade() {
    if(this.acronym === null || this.acronym === undefined) {
      return {
        isValid: false,
        error: 'Acronym cannot be null or undefined'
      }
    }

    if(this.acronym.length == 0) {
      return {
        isValid: false,
        error: 'Acronym cannot be empty'
      }
    }

    if(this.acronym.length > 10) {
      return {
        isValid: false,
        error: 'Acronym cannot be larger than 10 characters'
      }
    }

    return {
      isValid: true,
    }
  }
}

module.exports = Fund