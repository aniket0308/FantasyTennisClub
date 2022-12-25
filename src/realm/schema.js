export const MembershipTournament = {
    name: "membershipTournament",
    properties: {
        tournament_id: "int",
        end_date: "string",
        tournament: "string?",
        start_date: "string?",
        price: "int",
        sub_title: "string?",
        title: "string?",
    },
    primaryKey: "tournament_id",
};