export default function formatTime(time: number): string {
  let result: string = "";

  const millisecondsInASecond = 1000;
  const millisecondsInAMinute = millisecondsInASecond * 60;
  const millisecondsInAnHour = millisecondsInAMinute * 60;

  const hours: number = Math.floor(time / millisecondsInAnHour);
  time %= millisecondsInAnHour;

  result = hours.toString().concat(" hours");

  const minutes: number = Math.floor(time / millisecondsInAMinute);
  time %= millisecondsInAMinute;

  result = result.concat(" ", minutes.toString(), " minutes");

  const seconds: number = time / millisecondsInASecond;

  result = result.concat(" ", seconds.toString(), " seconds");

  return result;
}
