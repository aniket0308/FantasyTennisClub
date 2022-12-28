import AsyncStorage from "@react-native-async-storage/async-storage";
import Realm from "realm";
import { MembershipTournament, realm } from "./schema";

export const openRealm = async () => {
    try {
        const realm = await Realm.open({
            schema: [MembershipTournament],
        });
        return realm
    } catch (error) {
        console.log('Error in opening realm', error);
    }
}

export const addTournamenrMembership = async(payload) => {
    console.log('what is payload',payload);
    try {
        const realm=await openRealm()
        const userId=await AsyncStorage.getItem('@userId')
        realm.write(() => {
            realm.create('membershipTournament', {
                membership_id:new Date(Date.now()).toString(),
                tournament_id:payload?.tournament_id,
                end_date: payload?.end_date,
                tournament: payload?.tournament,
                start_date: payload?.start_date,
                price: payload?.price,
                sub_title: payload?.sub_title,
                title: payload?.title,
                userId:userId.toString()
            })
        })

    } catch (error) {
        console.log('Error in adding data:::::', error);
    }
}

export const getMembershipTournament=async()=>{
    try {
        const realm=await openRealm()
        const userId=await AsyncStorage.getItem('@userId')
        const allMembership= realm.objects('membershipTournament')
        console.log('Data Added Successfully!!:::::::::',allMembership);
        const filterData=allMembership.filter((i)=>{
            console.log(i.userId==userId.toString(),'fdfdfdfdfdfdf');
            if(i.userId==userId.toString()){
                console.log('membership in true');
                return i
            }
        })
        return filterData
    }catch(error){
        console.log('Error in fetching data',error);
    }
}

export const deleteAllMembership=async()=>{
    try {
        const realm=await openRealm()
        const userId=await AsyncStorage.getItem('@userId')
        realm.write(()=>{
            const allMembership= realm.objects('membershipTournament')
            allMembership.map((i)=>{
                if(i.userId==userId.toString()){
                    realm.delete(i)
                }
            })
        })
        console.log('Delete Successfull');
    } catch (error) {
        console.log('Error In Deleting Object',error);
    }
}

export const deleteMembershipById=async(tournamentId,membership_id)=>{
    try {
        const realm=await openRealm()
        const userId=await AsyncStorage.getItem('@userId')
        realm.write(()=>{
            const allMembership= realm.objects('membershipTournament')
            allMembership.map((i)=>{
                if(i?.tournament_id==tournamentId&&i?.userId==userId.toString()&&i?.membership_id==membership_id)
                {
                    realm.delete(i)
                }
            })
        })
        console.log('Delete Successfull');
    } catch (error) {
        console.log('Error In Deleting Object',error);
    }
}