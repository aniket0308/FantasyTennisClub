export const MembershipTournament = {
    name: "membershipTournament",
    properties: {
        membership_id:'string',
        tournament_id: "int",
        userId:'string',
        end_date: "string",
        tournament: "string?",
        start_date: "string?",
        price: "int",
        sub_title: "string?",
        title: "string?",
    },
    primaryKey: "membership_id",
};