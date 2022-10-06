export class StringUtils
{
  public static somenteNumeros(numero: string): string
  {
    return numero.replace(/[^0-9]/g, '');
  }
}