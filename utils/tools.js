const beseUrl = "http://localhost:3000"

async function myRequest(url="",data={},method="GET",header={}){
	return await uni.request({
		url:beseUrl+url,
		data:data,
		method:method,
		header:header
	})
}
export {myRequest,beseUrl}