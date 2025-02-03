import {Tabs} from "expo-router"

export default function TabLayout(){
    return(
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#25292e',
                }
            }}
        ></Tabs>
    )
}