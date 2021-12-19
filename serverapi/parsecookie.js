exports.getRefreshToken = (cookie) => {
    const cookieArray = cookie.split(';')
    const refreshTokenCookie = cookieArray.filter(item => item.includes('refresh_token'))
    return refreshTokenCookie.length > 0 ? refreshTokenCookie[0].split('=')[1] : ""
}

