import axios from "axios";
import CryptoJS from 'crypto-js';


function Smsapi(){
    const url = 'https://sens.apigw.ntruss.com/sms/v2/services/ncp:sms:kr:275533844075:capstone/messages';
    const url2 = '/sms/v2/services/ncp:sms:kr:275533844075:capstone/messages';
    
    let date = new Date().getTime;    
    const access_key = 'eSUtW4RWWMX8kNNVn4QL';
    const secret_key = 'Gx95nPyNx2OVOp5le1lAJtQRLExDzpF1pViKWoQ1';
    const phone = '01022446012';
    const method = 'POST';
    const space = " ";
    const newLine = '\n';
    let hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secret_key);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(access_key);
    let hash = hmac.finalize();

    let signature = hash.toString(CryptoJS.enc.Base64);

    let data = {"Contenc-type": "application/json; charset=utf-8",
                "x-ncp-iam-access-key": access_key,
                "x-ncp-apigw-timestamp": date,
                "x-ncp-apigw-signature-v2": signature }

    
        axios({
            method: method,
            
            url: url,
            headers: JSON.stringify(data),
            
            data: {
                type: "SMS",
                countryCode: "82",
                from: phone,
                // 원하는 메세지 내용
                content: `아아 테스트`,
                messages: [
                // 신청자의 전화번호
                    { to: phone, },]
            }
        })   
}
    


export default Smsapi;