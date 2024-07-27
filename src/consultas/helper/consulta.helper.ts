export class ConsultalHeper {
    private static generateRandomString(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
        return result;
      }
      
       static generateMeetingUrl(): string {
        const part1 = this.generateRandomString(3); // "wgs"
        const part2 = this.generateRandomString(4); // "zvip"
        const part3 = this.generateRandomString(3); // "zsk"
        return `https://meet.google.com/${part1}-${part2}-${part3}`;
      }
}