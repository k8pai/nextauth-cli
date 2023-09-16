export const GenerateNeo4jConfig = () => {
	return `import neo4j from "neo4j-driver"
	
export const driver = neo4j.driver(
	"bolt://localhost",
	neo4j.auth.basic("neo4j", "password")
)
	  
const neo4jSession = driver.session();

export default neo4jSession;`;
};
