import Realm from "realm";
import { MembershipTournament, realm } from "./schema";

export const openRealm = async () => {
    try {
        const realm = await Realm.open({
            path: "realm-files/myrealm",
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
        realm.write(() => {
            realm.create('membershipTournament', {
                tournament_id:payload?.tournament_id,
                end_date: payload?.end_date,
                tournament: payload?.tournament,
                start_date: payload?.start_date,
                price: payload?.price,
                sub_title: payload?.sub_title,
                title: payload?.title,
            })
        })

    } catch (error) {
        console.log('Error in adding data:::::', error);
    }
}

export const getMembershipTournament=async()=>{
    try {
        const realm=await openRealm()
        const allMembership= realm.objects('membershipTournament')
        console.log('Data Added Successfully!!',allMembership);
        return allMembership
    }catch(error){
        console.log('Error in fetching data',error);
    }
}

export const deleteAllMembership=async()=>{
    try {
        const realm=await openRealm()
        realm.write(()=>{
            const allMembership= realm.objects('membershipTournament')
            allMembership.map((i)=>{
                realm.delete(i)
            })
        })
        console.log('Delete Successfull');
    } catch (error) {
        console.log('Error In Deleting Object',error);
    }
}

export const deleteMembershipById=async(tournamentId)=>{
    try {
        const realm=await openRealm()
        realm.write(()=>{
            const allMembership= realm.objects('membershipTournament')
            allMembership.map((i)=>{
                if(i?.tournament_id==tournamentId)
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