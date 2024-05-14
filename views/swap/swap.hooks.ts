import { Aftermath } from 'aftermath-ts-sdk';

export const useAftermathRouter = () => new Aftermath('MAINNET').Router();
