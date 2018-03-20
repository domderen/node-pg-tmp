interface ConnectionOptions {
  connection: string;
  host: string;
  user: string;
  password: string;
  database: string;
}

export default function pgTmp(setEnvironment?: boolean, opts?: string[]): Promise<ConnectionOptions>
