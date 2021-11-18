declare namespace NodeJS {
    // 環境変数名の定義
    interface ProcessEnv {
      /** 現在の Node.js 実行環境 */
      readonly NODE_ENV: 'development' | 'production' | 'test';
  
      /** GitHub アクセストークン */
      readonly MYAPP_GITHUB_TOKEN: string;


      readonly IS_DEV : "1" | "0" | "";

      readonly LINE_ACCESS_TOKEN : string;
      readonly LINE_SECRET_KEY : string;

      readonly DATABASE_URL : string;

    }
  }