const { getSiteVerificationToken } = require('../google')
const { SiteverificationMock } = require('../mocks/google')

describe("google apis test suite", () => {
    it('should return a token', () => {
        expect(getSiteVerificationToken({domain: 'test'}, { google: { token: 'test' } }, { siteVerificationV1: SiteverificationMock }))
    })
})