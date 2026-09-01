import { eventContextLabels, type EventContext, type GameDefinition } from "./game-types";

export function gamePeopleLabel(game: GameDefinition) {
  const people = game.profile?.people;
  if (!people) return "인원 확인 필요";
  return people.max ? `${people.min}~${people.max}명` : `${people.min}명 이상`;
}

export function gameTeamLabel(game: GameDefinition) {
  const teams = game.profile?.recommendedTeams;
  if (teams) return `${teams.min}~${teams.max}조 권장`;
  return game.mode === "team" ? "팀전" : game.mode === "personal" ? "개인전" : "팀·개인 가능";
}

export function gameContextLabel(context: EventContext) {
  return eventContextLabels[context];
}

export function fitsEventContext(game: GameDefinition, context: EventContext | "all") {
  return context === "all" || game.profile?.contexts.includes(context) === true;
}
