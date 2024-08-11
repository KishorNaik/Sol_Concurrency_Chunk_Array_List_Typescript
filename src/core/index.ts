import Enumerable from "linq"

// Sample User DTO
interface IUserDTO{
    id:number;
    name:string;
}

// Mock client with a getUser method
const getUserAsync=(id:number): Promise<IUserDTO> => {
    return new Promise((resolve, reject) => {
        try
        {
            setTimeout(() => {
                resolve({ id, name: `User ${id}` });
            }, 100);
        }
        catch(ex)
        {
            return reject(ex);
        }
    });
}

// Main function to process user IDs in chunks
const processUserIdsAsync = async (userIds: number[],batchSize: number) : Promise<Array<IUserDTO>> => {
    const userPromises: Promise<IUserDTO[]>[] = [];
    const numberOfBatches = Math.ceil(userIds.length / batchSize);

    for (let i = 0; i < numberOfBatches; i++) {
        const currentIds = Enumerable.from(userIds).skip(i * batchSize).take(batchSize).toArray();
        const tasks = currentIds.map(id => getUserAsync(id));
        userPromises.push(Promise.all(tasks));
    }

    // Wait for all batches to complete and flatten the result
    const users = (await Promise.all(userPromises)).flat();

    return users;
}

// Sample data
const userIds: number[] = Array.from({ length: 25 }, (_, i) => i + 1);

const main=async (): Promise<void>=>{
    const batchSize=2;
    const result=await processUserIdsAsync(userIds,batchSize);
    console.table(result);
}

main()
    .then()
    .catch(error => console.error(error));  