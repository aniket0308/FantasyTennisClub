//Navigation On Another Page
export const navigateTo=(navigation,screen,passData)=>{
    console.log('What Are Passed Data:',passData,screen);
    navigation.navigate(screen,passData)
}