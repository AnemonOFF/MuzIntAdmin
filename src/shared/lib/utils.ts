import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(min: number, max: number): number {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

export function getRandomTimeSpan(
  minSeconds: number,
  maxSeconds: number
): string {
  const minMicroseconds = minSeconds * 1_000_000;
  const maxMicroseconds = maxSeconds * 1_000_000;

  const randomMicroseconds = getRandomInt(minMicroseconds, maxMicroseconds);

  const totalSeconds = Math.floor(randomMicroseconds / 1_000_000);
  const remainingMicroseconds = randomMicroseconds % 1_000_000;

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMicroseconds = remainingMicroseconds
    .toString()
    .padStart(7, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMicroseconds}`;
}

export function getImageSize(
  image: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const img = new Image();

        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };

        img.src = fileReader.result as string;
      };

      fileReader.readAsDataURL(image);
    } catch (e) {
      reject(e);
    }
  });
}
