const sleep = ()=>{
  return new Promise((resolve, rejected)=>{
    setTimeout(()=>{
      resolve('sleep')
    },2000)
  })
}




const test = async () =>{
  let res = await sleep()
  console.log('test')
  return res
}


const main = async ()=>{
  let result = await test()
  console.log(result)
}


main()