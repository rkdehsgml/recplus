/** P08 이후 클라이언트 outbox와 RPC가 공유할 실행 명령 계약입니다. */
export type EventRunGameStatus = "pending" | "playing" | "completed" | "skipped";
export type EventRunStatus = "active" | "finished" | "aborted";

export type RunCommandReceipt = {
  id: string;
  revision: number;
  serverReceivedAt: string;
  reused: boolean;
};

export type StartEventRunCommand = {
  kind: "start_run";
  planId: string;
  expectedPlanRevision: number;
  runId: string;
  primaryDeviceId: string;
  requestId: string;
  practice: boolean;
};

export type StartRunGameCommand = {
  kind: "start_game";
  runId: string;
  runGameId: string;
  expectedRevision: number;
  primaryDeviceId: string;
  requestId: string;
};

export type RecordRunGameResultCommand = {
  kind: "record_game_result";
  runId: string;
  runGameId: string;
  expectedRevision: number;
  primaryDeviceId: string;
  requestId: string;
  status: "completed" | "skipped";
  reason?: string;
  consoleElapsedSeconds?: number;
};

export type FinishEventRunCommand = {
  kind: "finish_run" | "abort_run";
  runId: string;
  expectedRevision: number;
  primaryDeviceId: string;
  requestId: string;
  reason?: string;
};

export type CorrectRunGameResultCommand = {
  kind: "correct_game_result";
  runId: string;
  runGameId: string;
  expectedRevision: number;
  primaryDeviceId: string;
  requestId: string;
  status: "completed" | "skipped";
  reason: string;
};
