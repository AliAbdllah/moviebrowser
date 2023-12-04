export const get = async (path: string, params = null) => {
  const requestOptions = {
    method: "GET",
  };
  let url: string;
  if (params !== null) {
    url = `${process.env.NEXT_PUBLIC_API_URL}${path}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&${params}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_URL}${path}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  }
  return await helperFetch(url, requestOptions);
};

export const handleImageResponse = (url: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}${url}`;
};

// helper functions

const helperFetch = async (
  url: RequestInfo | URL,
  requestOptions?: RequestInit,
) => {
  // process.stdout.write(
  //   "\x1b[33m" + requestOptions?.method + " | url: " + "\x1b[89m"
  // );
  console.time(String(url));
  const urlString = url instanceof URL ? url.toString() : url;
  const response = await fetch(urlString, requestOptions);
  console.timeEnd(String(url));
  const data = response.json();
  if (!response.ok) {
    const error = "Something Went Wrong: " + response.statusText;
    console.error(error);
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data! " + error);
  }
  return data;
};
export const commonFetch = {
  get,
};
