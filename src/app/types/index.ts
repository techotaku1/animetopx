export interface News {
  id: string;
  title: string;
  content: string;
  date: string | Date;
  image: string;
  isCover: boolean;
  category: string;
}
