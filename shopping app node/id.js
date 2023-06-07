


export const idCreator = () =>{

    let dateBase36 = Date.now().toString(36).toUpperCase()
    let randomNumbMax = parseInt(Math.random()*Number.MAX_SAFE_INTEGER)
    let randomNumbBase = randomNumbMax.toString(36).slice(0,12).padStart(12, '0').toUpperCase()

return `${dateBase36} - ${randomNumbBase}`
}


