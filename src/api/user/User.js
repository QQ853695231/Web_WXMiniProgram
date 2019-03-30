import {get} from '@/utils/httpUtils'

export function loginPlatformAfterWxLogin (code) {
    return get('/login', {code: code} )
}

export function loginPlatform () {

}

export default loginPlatformAfterWxLogin
